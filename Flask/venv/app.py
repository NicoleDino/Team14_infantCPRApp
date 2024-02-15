from flask import Flask, request
from flask_socketio import SocketIO
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")  

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
        pressure_str = data.strip() 
        pressure = float(pressure_str)

        socketio.emit('realtime_pressure', pressure)

        threshold_min = -0.45
        threshold_max = -0.25
        if threshold_min <= pressure <= threshold_max:
            socketio.emit('threshold_message', "Pressure reached!")
        elif pressure <= threshold_min:
            socketio.emit('threshold_message', "Too much Pressure!!!!")
        else:
            socketio.emit('threshold_message', "Pressure NOT enough")

        return "Data received successfully!"
    except Exception as e:
        print("Error in receiving data:", e)
        return "Error in receiving data!"

@app.route('/arduino_endpoint', methods=['POST'])
def arduino_endpoint():
    data = request.data.decode('utf-8')
    try:
        flow_rate_start = data.find('Flow Rate:') + len('Flow Rate:')
        flow_rate_end = data.find('mL/s')
        flow_rate = float(data[flow_rate_start:flow_rate_end].strip())

        status = determine_status(flow_rate)

        socketio.emit('arduino_data', {
            'flow_rate': flow_rate,
            'status': status
        })

        return 'OK'
    except ValueError:
        print("Error: Data format is incorrect")
        return 'Error: Data format is incorrect'

def determine_status(flow_rate):
    if flow_rate >= 5.00 and flow_rate <= 11.8:
        return 'HIT'
    elif flow_rate > 11.8:
        return 'MAX'
    elif flow_rate < 5.00:
        return 'MIN'
    else:
        return 'UNKNOWN'

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
