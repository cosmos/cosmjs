#!/usr/bin/env python3
#pylint:disable=missing-docstring,invalid-name

import argparse
import asyncio
import websockets
import time

HOST = "0.0.0.0"

def log(data):
    print(data, flush=True)

@asyncio.coroutine
def connection_handler(connection, path):
    connection_id = hex(id(connection))
    log("{} opened connection via {}".format(connection_id, path))
    try:
        while True:
            incoming_message = yield from connection.recv()
            log("< {}".format(incoming_message))
            outgoing_message = incoming_message
            yield from connection.send(outgoing_message)
            log("> {}".format(outgoing_message))
    except websockets.exceptions.ConnectionClosed:
        log("{} closed connection".format(connection_id))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port",
        help="Port to listen on",
        type=int,
        default=4000)
    parser.add_argument("--delay",
        help="Time in seconds that a connection will be delayed before establishing it",
        type=int,
        default=0)
    args = parser.parse_args()

    def delaying_process_request(path, request_headers):
        time.sleep(args.delay)
        return None

    log("Starting server at {}:{}".format(HOST, args.port))
    server = websockets.serve(connection_handler, HOST, args.port, process_request=delaying_process_request)
    log("Running now.")

    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()
