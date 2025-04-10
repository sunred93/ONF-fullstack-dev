import socket
import sys

HOST = 'localhost'
PORT = 12345
ADDRESS = (HOST, PORT)

def start_server():
    server_socket = socket.socket()
    server_socket.bind(ADDRESS)

    # Listen for incoming connections
    server_socket.listen()

    print("Server is waiting for connections...")

    # Accept a connection
    client_socket, client_address = server_socket.accept()
    print(f"Connection from {client_address}")

    # Receive data
    data = client_socket.recv(1024).decode()
    print(f"Received from client: {data}")

    # Send a response
    response = "Hello from the server!"
    client_socket.send(response.encode())

    # Close the connection
    client_socket.close()
    server_socket.close()

def run_client():
    # Client setup
    client_socket = socket.socket()
    client_socket.connect(ADDRESS)

    # Send a message to the server
    message = "Hello from the client!"
    client_socket.send(message.encode())

    # Receive a response from the server
    response = client_socket.recv(1024).decode()
    print(f"Received from server: {response}")

    # Close the connection
    client_socket.close()

if __name__ == '__main__':
    if sys.argv[1] == 'server':
        start_server()
    else:
        run_client()