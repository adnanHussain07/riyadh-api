import json
from re import X
import requests

import numpy as np
import cv2
import os
import glob
import struct
import snap7.client as c
from snap7.util import *
from snap7.types import *






def ReadBool(byte_idx, bit_idx):
    bool_buffer = plc.read_area(Areas['MK'],0,byte_idx, S7WLBit)
    bool_result = get_bool(bool_buffer, 0, bit_idx)
    return bool_result
 

def WriteReal(db_idx, data):
    byte_buffer = struct.pack(">f", data)
    plc.write_area(Areas["DB"], db_idx, 0, byte_buffer)


# Folder in which I save taken photos
path = 'test_folder'
img_counter = 1
for file in glob.glob("test_folder/*"):
    os.remove(file)
    print(str(file) + " deleted ")
print("")

cap = cv2.VideoCapture("images/video_test.MOV")

# Connecting to PLC Siemens S7-1200
if __name__=="__main__":
    plc = c.Client()
    plc.connect('192.168.0.1', 0, 1)
    if plc.get_connected():
        print("PLC connected")
    state = plc.get_cpu_state()
    print("CPU mode: ", state)
    
    payload1 = dict(key2=state,italy=tommi)
    url2 = 'http://localhost:1880/state'

        # y = requests.post(url, json = myobj)
        y = requests.post(url2, json = payload1)
    
while True:
    # Here I wait for a bit to be True

    start_cycle = ReadBool(10, 0)
    if start_cycle == 'True':
        msg = "Start_Cycle_is_True"
        print("in true")
    if start_cycle == 'False':
        msg = ""
        print("in false")


    payload3 = dict(startcycle=msg)
    url3 = 'http://localhost:1880/startcycle'

        # y = requests.post(url, json = myobj)
        a = requests.post(url3, json = payload3)
    print(start_cycle)
    if start_cycle:
        ret, frame = cap.read()
        frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)
        gray_area = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        _, threshold_area = cv2.threshold(gray_area, 120, 255, cv2.THRESH_BINARY)
        diam_contours, _ = cv2.findContours(threshold_area, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        key = cv2.waitKey(70)

        if key == 27: # esc button to shut it down
            break
        elif key % 256 == 32: # space button to take the picture
            print("camera_frame_{} written".format(img_counter))
            print("")

            diam_list = np.array([])
            for diam_cnt in diam_contours:
                diam_area = cv2.contourArea(diam_cnt)
                if diam_area > 8000:
                    rect = cv2.minAreaRect(diam_cnt)
                    (x, y), (w, h), angle = rect
                    width = rect[1][0]
                    height = rect[1][1]
                    diameter = (width + height) * 0.5
                    diam_list = np.append(diam_list, diameter)
                    cv2.polylines(frame, [diam_cnt], True, (255, 0, 0), 2)

                    for diam_count, diam in enumerate(diam_list):
                        cv2.putText(frame, "diameter: {}".format(round(diam, 1)), (50, 100 + 20 * diam_count), cv2.FONT_HERSHEY_PLAIN, 1, (100, 255, 0), 2)

            # Saving the image in test folder
            img_name = "camera_frame_{}.png".format(img_counter)
            cv2.imwrite(os.path.join(path, img_name), frame)
            img_counter += 1

           # Printing dimension
            diam = diam_list[0]
            print("")
            print("diameter: ", diam)
            print("")
            

        payload = dict(key1=diam)
        url = 'http://localhost:1880/'

        # x = requests.post(url, json = myobj)
        x = requests.post(url, json = payload)
            # Sending dimension data to PLC
            WriteReal(4, diam)

        # Showing the frames
        cv2.imshow("frame", frame)

cap.release()
cv2.destroyAllWindows()

# :)