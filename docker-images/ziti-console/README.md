
# openziti/ziti-console

## Overview

This is the preferred image for including the Ziti Administration Console (ZAC) in a multi-stage build of the ziti-controller image. The controller has an optional API binding `zac` that creates a `/zac` handler on the `edge-management` API's web listener.

## Deploy

[Link to deployment guide](https://openziti.io/docs/guides/deployments/docker/console)

## Build

In the project root, build the image with the `BASE_HREF` build argument set to the path where the console will be served (default: `/zac` is hard-coded in `ziti controller`).

The default value of `DEPLOY_URL` is the value of `BASE_HREF`. These values are used in the Angular build to set the base URL for the console and correspond to `ng` CLI parameters `--base-href` and `--deploy-url`, respectively.

```bash
docker build \
    --tag ziti-console:local \
    --file ./docker-images/ziti-console/Dockerfile \
    --build-arg BASE_HREF=/zac/ \
    --build-arg DEPLOY_URL=/zac/ \
    "${PWD}"
```

Copy the SPA static files from the ziti-console image to a ziti-controller image. The controller image must serve the static files at the path specified by the `BASE_HREF` build argument.

```docker
FROM ziti-console:local as ziti-console

FROM openziti/ziti-controller:1.1.0

COPY --from=ziti-console /usr/src/app/dist/app-ziti-console /ziti-console
```

[The `openziti/ziti-controller` image](https://github.com/openziti/ziti/blob/release-next/dist/docker-images/ziti-controller/Dockerfile) uses the same approach.
