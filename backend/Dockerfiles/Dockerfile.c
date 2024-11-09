# Use a lightweight GCC image
FROM gcc:latest

# Set working directory
WORKDIR /usr/src/app

# Command to compile and run C code
CMD ["bash", "-c", "gcc main.c -o main && ./main"]
               