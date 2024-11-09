# Use a lightweight PHP image
FROM php:7.4-cli

# Set working directory
WORKDIR /usr/src/app

# Command to run PHP code
CMD ["php", "main.php"]
