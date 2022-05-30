#!usr/bin/env python
import http.server
import os
import rospkg

r = rospkg.RosPack()

path = r.get_path('px_100_teleop')
print(path)
os.chdir(f'{path}/web/htmlTurtle')

server_object = http.server.HTTPServer(("",5000),http.server.CGIHTTPRequestHandler)

server_object.serve_forever()