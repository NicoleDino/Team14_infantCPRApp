from flask import Flask, request
from flask_socketio import SocketIO
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow connections from any origin

allowed_ip = '192.168.68.107'

# Global variables for peak flow rate and last pulse time
peak_flow_rate = 0.0
last_pulse_time = time.time()

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.data.decode('utf-8')
    print("Received data from NodeMCU:", data)
    
    try:
        # Split the data string by ':' to separate the pressure value
        pressure_str = data.strip()  # Remove leading/trailing whitespace
        pressure = float(pressure_str)

        # Emit the real-time pressure value to the connected clients
        socketio.emit('realtime_pressure', pressure)

        # Check if pressure is within the threshold range
        threshold_min = -0.65
        threshold_max = -0.55
        if threshold_min <= pressure <= threshold_max:
            # Emit the message to the connected clients
            socketio.emit('threshold_message', "Pressure reached!")
        elif pressure <= threshold_min:
            socketio.emit('threshold_message', "Too much Pressure!!!!")
        else:
            # Emit an empty message if the pressure is not within the range
            socketio.emit('threshold_message', "Pressure NOT enough")

        return "Data received successfully!"
    except Exception as e:
        print("Error in receiving data:", e)
        return "Error in receiving data!"

# Route handler for /arduino_endpoint
@app.route('/arduino_endpoint', methods=['POST'])
def arduino_endpoint():
    data = request.data.decode('utf-8')
    try:
        # Extract flow rate from the data string
        flow_rate_start = data.find('Flow Rate:') + len('Flow Rate:')
        flow_rate_end = data.find('mL/s')
        flow_rate = float(data[flow_rate_start:flow_rate_end].strip())

        # Determine the status based on the flow rate
        status = determine_status(flow_rate)

        # Emit the flow rate and status to the client with specific keys
        socketio.emit('arduino_data', {
            'flow_rate': flow_rate,
            'status': status
        })

        return 'OK'
    except ValueError:
        # Handle the case where the data cannot be converted to float
        print("Error: Data format is incorrect")
        return 'Error: Data format is incorrect'

def determine_status(flow_rate):
    # Your logic to determine MIN, HIT, MAX status
    # Replace this with your actual logic
    if flow_rate >= 5.00 and flow_rate <= 11.8:
        return 'HIT'
    elif flow_rate > 11.8:
        return 'MAX'
    elif flow_rate < 5.00:
        return 'MIN'
    else:
        return 'UNKNOWN'

if __name__ == '__main__':
    # Bind the server to any available network interface
    socketio.run(app, host=allowed_ip, port=5000)