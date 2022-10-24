FROM ubuntu:20.04
ENV DEBIAN_FRONTEND noninteractive
WORKDIR /fb
RUN apt-get update
RUN apt-get install -y git
# RUN git clone https://github.com/Syn3rman/fluent-bit.git
RUN git clone https://github.com/fluent/fluent-bit.git
WORKDIR /fb/fluent-bit
RUN apt-get install -y build-essential make cmake g++ flex bison libssl-dev
WORKDIR /fb/fluent-bit/build
RUN cmake -DFLB_CONFIG_YAML=Off ../
RUN make
RUN make install
WORKDIR /fb
COPY ./fluent.conf .
WORKDIR /fb/fluent-bit/build
CMD ["bin/fluent-bit", "-v","-c", "/fb/fluent.conf"]
