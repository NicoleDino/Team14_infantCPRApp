from flask import Flask, request
from flask_socketio import SocketIO
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow connections from any origin

# Replace 'your_specific_ip' with the actual IP address you want to allow
allowed_ip = '192.168.68.109'

# Global variables for peak flow rate and last pulse time
peak_flow_rate = 0.0
last_pulse_time = time.time()

@socketio.on('message')
def handle_message(data):
    print('received message:', data)
    
    # Respond back to the client
    socketio.emit('response', {'message': 'Received your message: ' + data})

@socketio.on('data')
def handle_data(data):
    socketio.emit('arduino_data', {'message': 'Received data from Arduino: ' + data})

# Route handler for /arduino_endpoint
@app.route('/arduino_endpoint', methods=['POST'])
def arduino_endpoint():
    data = request.data.decode('utf-8')
    # Extract relevant information from the data (modify as needed)
    flow_rate, peak_flow_rate, frequency, status = extract_information(data)

    # Limit frequency to 2 decimal places
    frequency = round(frequency, 2)

    # Emit the information to the client with specific keys
    socketio.emit('arduino_data', {
        'flow_rate': flow_rate,
        'peak_flow_rate': peak_flow_rate,
        'frequency': frequency,
        'status': status
    })
    return 'OK'

def extract_information(data):
    # Your logic to extract numerical flow rate value from the data
    flow_rate_start = data.find(':') + 1
    flow_rate_end = data.find('mL/s')
    flow_rate_str = data[flow_rate_start:flow_rate_end].strip()

    # Convert the flow rate string to a float
    flow_rate = float(flow_rate_str)

    # Your logic to determine MIN, HIT, MAX status
    status = determine_status(flow_rate)

    # Your logic to calculate peak flow rate and frequency
    # For example, you might keep track of the highest flow rate observed
    # and calculate frequency based on the time between pulses from the flow sensor

    global peak_flow_rate
    global last_pulse_time

    if flow_rate > peak_flow_rate:
        peak_flow_rate = flow_rate

    current_time = time.time()
    time_since_last_pulse = current_time - last_pulse_time

    if time_since_last_pulse > 0:
        frequency = 1 / time_since_last_pulse
    else:
        frequency = 0

    last_pulse_time = current_time

    return flow_rate, peak_flow_rate, frequency, status


def determine_status(flow_rate):
    # Your logic to determine MIN, HIT, MAX status
    # Replace this with your actual logic
    if flow_rate >= 20.4 and flow_rate <= 27.2:
        return 'HIT'
    elif flow_rate > 27.2:
        return 'MAX'
    elif flow_rate < 20.4:
        return 'MIN'
    else:
        return 'UNKNOWN'

# Route handler for /flow_rate_endpoint
@app.route('/flow_rate_endpoint', methods=['POST'])
def flow_rate_endpoint():
    flow_rate = request.data.decode('utf-8')
    # Emit the flow rate to the client with the key 'data'
    socketio.emit('flow_rate', {'data': flow_rate})
    return 'OK'

if __name__ == '__main__':
    # Bind the server to any available network interface
    socketio.run(app, host=allowed_ip, port=5000)
