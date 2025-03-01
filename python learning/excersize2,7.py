mode= input("enter math operation(+,-,*,/):")
num1= int(input("enter first number:"))
num2= int(input("enter second number:"))
if mode=="+":
    print(num1+num2)
elif mode=="-":
    print(num1-num2)
elif mode=="*":
    print(num1*num2)
elif mode=="/":
    print(num1/num2)
else:
    print("invalid operation")
# Output: enter math operation(+,-,*,/):+


