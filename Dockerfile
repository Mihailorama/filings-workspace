FROM artifacts.int.corefiling.com:5000/labs/simple-platform-server:2.0.1-dev.38345
ENV APP_NAME quick-xbrl-validator
ENV STATIC_DIR /app/static
COPY www $STATIC_DIR
