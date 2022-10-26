FROM pwhelan/fluent-bit:2.0.0-a9c7aef87
ENV DEBIAN_FRONTEND noninteractive
# RUN cmake -DFLB_CONFIG_YAML=Off ../
WORKDIR /fb
COPY ./fluent.conf .
CMD ["/fluent-bit/bin/fluent-bit", "-c", "/fb/fluent.conf"]
