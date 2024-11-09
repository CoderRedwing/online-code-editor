# Use a lightweight OpenJDK image
FROM openjdk:latest

# Set working directory
WORKDIR /usr/src/app

# Command to compile and run Java code
CMD ["bash", "-c", "javac Main.java && java Main"]
