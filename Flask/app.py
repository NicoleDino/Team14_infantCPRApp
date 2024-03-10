from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import time

from src.ScoringSystem import ScoringSystem

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*")

peak_flow_rate = 0.0
last_pulse_time = time.time()

# Initialize scoring system
scoring_system = ScoringSystem()


@socketio.on("connect")
def handle_connect():
    print("Client connected")


@app.route("/receive_data", methods=["POST"])
def receive_data():
    data = request.data.decode("utf-8")
    print("Received data from NodeMCU:", data)

    try:
        pressure_str = data.strip()
        pressure = float(pressure_str)

        socketio.emit("realtime_pressure", pressure)

        threshold_min = 0.50
        threshold_max = 0.70
        if threshold_min <= pressure <= threshold_max:
            socketio.emit("threshold_message", "Pressure reached!")
        elif pressure >= threshold_max:
            socketio.emit("threshold_message", "Too much Pressure!!!!")
        else:
            socketio.emit(
                "threshold_message", "Ready To Pump!"
            )

        # Implement scoring for compressions
        scoring_system.check_compression(pressure, threshold_min, threshold_max)

        # Sends current count of compressions
        socketio.emit("compression_count", scoring_system.get_compressions())

        # Notifies the app to start rescue breaths
        socketio.emit("rescue_breath_ready", scoring_system.is_rescue_breath_ready())

        return "Data received successfully!"
    except Exception as e:
        print("Error in receiving data:", e)
        return "Error in receiving data!"


@app.route("/arduino_endpoint", methods=["POST"])
def arduino_endpoint():
    data = request.data.decode("utf-8")
    try:
        flow_rate_start = data.find("Flow Rate:") + len("Flow Rate:")
        flow_rate_end = data.find("mL/s")
        flow_rate = float(data[flow_rate_start:flow_rate_end].strip())

        status = determine_status(flow_rate)

        # Implement scoring for rescue breaths
        scoring_system.check_rescue_breath(status)

        # Sends current count of rescue breaths
        socketio.emit("rescue_breath_count", scoring_system.get_rescue_breaths())

        # Sends the number of cycles
        socketio.emit("cycle_count", scoring_system.get_cycles())

        if scoring_system.did_game_end() == True:
            # Send score to client/mobile app
            scores = scoring_system.get_scores()
            socketio.emit("scores", scores)

            # Resets the scoring system
            scoring_system.reset_scoring()

        socketio.emit("arduino_data", {"flow_rate": flow_rate, "status": status})

        return "OK"
    except ValueError:
        print("Error: Data format is incorrect")
        return "Error: Data format is incorrect"


@app.route("/restart", methods=["GET"])
def restart():
    scoring_system.reset_scoring()
    return jsonify({"message": "CPR restarted successfully"}), 200


def determine_status(flow_rate):
    if flow_rate >= 1.00 and flow_rate <= 2.50:
        return "HIT"
    elif flow_rate > 2.50:
        return "MAX"
    elif flow_rate < 1.00:
        return "MIN"
    else:
        return "UNKNOWN"


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
