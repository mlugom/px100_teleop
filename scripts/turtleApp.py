#!usr/bin/env python
import http.server
import os

os.chdir('phantom_ws/src/px_100_teleop/web/htmlTurtle')

server_object = http.server.HTTPServer(("",5000),http.server.CGIHTTPRequestHandler)

server_object.serve_forever()