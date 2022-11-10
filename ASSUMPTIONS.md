# Assumptions
In relation to the validation and evaluation of the string expressions,
initially I ended up using the Function method to validate and evaluate the formula expressions.

Also with the use of Function, there were still many other things that had to be tackled such as extra
error handling and validation handling.

Some validation handling that has to be considered is when the user writes only the cos, sin or tan operators
alone as these specific commands will show as valid yet in reality, they need extra validation not to be
stated as valid unless there's open and close parentheses in relation with them.

At the end, I ended up referring to a formula parser in which I made some extra changes to be built for this
specific need.

It was going to take more time to setup my own formula parser from scratch hence why I did this to at least show
a setup that works.
