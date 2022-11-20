import pyautogui as pt
import time

limit = input("Enter the limit:")
message = input("Enter the message:")
i = 0

time.sleep(3)

while i<int(limit):

    pt.typewrite(message)
    pt.press("enter")

    i+=1