#!/usr/bin/env python3
"""
Simple HTTP server for Oracle Report Viewer on port 8080
"""

import http.server
import socketserver
import os
import sys
from functools import partial

PORT = 8080

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler with CORS support for MetaMask"""

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        sys.stderr.write("%s - [%s] %s\n" %
                        (self.client_address[0],
                         self.log_date_time_string(),
                         format % args))

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    handler = partial(CORSHTTPRequestHandler)

    try:
        with ReusableTCPServer(("127.0.0.1", PORT), handler) as httpd:
            print(f"Oracle Report Viewer running at http://127.0.0.1:{PORT}/index2.html")
            print("Press Ctrl+C to stop")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
