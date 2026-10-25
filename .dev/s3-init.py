import json
import time

import boto3
from botocore.config import Config
from botocore.exceptions import EndpointConnectionError

BUCKET = "remapweights"
PUBLIC_READ = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": [f"arn:aws:s3:::{BUCKET}/*"],
        }
    ],
}

s3 = boto3.client("s3", config=Config(s3={"addressing_style": "path"}))
for _ in range(30):
    try:
        s3.create_bucket(Bucket=BUCKET)
    except s3.exceptions.BucketAlreadyOwnedByYou:
        pass
    except EndpointConnectionError:
        time.sleep(1)
        continue
    break
s3.put_bucket_policy(Bucket=BUCKET, Policy=json.dumps(PUBLIC_READ))
