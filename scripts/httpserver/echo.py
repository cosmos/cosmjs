#!/usr/bin/env python3
#pylint:disable=missing-docstring,invalid-name

import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import sys

HOST = "0.0.0.0"

def log(data):
    print(data, flush=True)

class CORSRequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        BaseHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        """Respond to a GET request."""
        if self.path == "/echo_headers":
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            body = {
                "request_headers": dict(self.headers)
            }
            self.wfile.write(json.dumps(body, sort_keys=True).encode())
        else:
            self.send_response(404)
            self.wfile.write("404. Try /echo_headers".encode())

    def do_POST(self):
        self.do_GET()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--port",
        help="Port to listen on",
        type=int,
        default=5555)
    args = parser.parse_args()
    httpd = HTTPServer((HOST, args.port), CORSRequestHandler)
    log("Starting server at {}:{}".format(HOST, args.port))
    httpd.serve_forever()
    log("Running now.")
