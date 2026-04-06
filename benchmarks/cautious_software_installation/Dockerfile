FROM try_base_image

# Install necessary packages
RUN apt-get update && apt-get install -y \
    vim \ 
    time

# Set the working directory
WORKDIR /home/tryuser

# Change the ownership of the copied files
RUN chown -R tryuser:tryuser /home/tryuser

# Switch to the new user
USER tryuser

#WORKDIR /root
COPY  --chown=tryuser:tryuser node-sass node-sass
COPY --chown=tryuser:tryuser ua-parser-js ua-parser-js
COPY --chown=tryuser:tryuser coa coa
COPY --chown=tryuser:tryuser eslint-scope eslint-scope 
COPY --chown=tryuser:tryuser hash_dir.sh hash_dir.sh
