#!/bin/bash

echo "Using env vars"
aws configure list | tail -n1

aws rds create-db-instance \
    --db-instance-identifier WordpressTest  \
    --db-name wordpressTest                 \
    --allocated-storage 5                   \
    --db-instance-class db.t2.micro         \
    --engine MySQL                          \
    --master-username wordpress             \
    --master-user-password wordpress#       \
    --no-multi-az


