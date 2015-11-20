###Environment files

The bare minimum for most deployments are an Nginx script, init.d script and a log rotation script.

If per environment files like config.js or config.json are in the project they should also be included here and built in as part of the deployment script per environment.

Files in this directory should be renamed with the __project_name__ as follows:

Nginx: __project_name__.nginx.j2

Log Rotation: __project_name__.rotate.j2

init.d: __project_name__.init.j2
