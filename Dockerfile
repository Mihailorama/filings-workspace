FROM artifacts.int.corefiling.com:5000/labs/simple-platform-server:0.1.2-ci.feature.inv.109.sans.auth.37428
ENV APP_NAME quick-xbrl-validator
ENV STATIC_DIR /app/static
COPY www $STATIC_DIR
