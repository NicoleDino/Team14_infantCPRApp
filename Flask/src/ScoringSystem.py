#ScoringSystem.py

class ScoringSystem:
    """The ScoringSystem class is responsible for saving the number of compressions, rescue breaths,
    and cycles. It is also responsible for processing the score that will be shown to the user.
    """

    def __init__(self):
        # Scoring configurations
        self.maxNumOfCompressions = 30  # default: 30
        self.maxNumOfRescueBreaths = 2  # default: 2
        self.maxCycles = 1  # default: 5

        # Initiates scores
        self.reset_scoring()

    def reset_scoring(self):
        """Reset the scoring back to its initial state"""

        # Initializing scores to 0
        self.numOfCompressions = 0
        self.numOfRescueBreaths = 0
        self.numOfCycles = 0

        self.numOfMistakeCompressions = 0
        self.numOfMistakeRescueBreaths = 0

        # Controls the scoring to forcefully decompress the user when it reaches the ideal pressure.
        self.resetCompressions = False

        # Controls the scoring to forcefully stop the user when it reaches the ideal flow rate
        self.resetRescueBreaths = False

        # Controls when the rescue breath scoring is enabled
        self.enableRescueBreath = False

        # Controls the counting of mistakes on compressions and rescue breaths
        self.resetMistakeCompressions = False
        self.resetMistakeRescueBreaths = False

    # Getters
    def is_rescue_breath_ready(self):
        return self.enableRescueBreath

    def get_compressions(self):
        return self.numOfCompressions

    def get_rescue_breaths(self):
        return self.numOfRescueBreaths

    def get_cycles(self):
        return self.numOfCycles

    def get_mistake_compressions(self):
        return self.numOfMistakeCompressions

    def get_mistake_rescue_breaths(self):
        return self.numOfMistakeRescueBreaths

    def get_scores(self):
        return {
            "game_end": self.did_game_end(),
            "cycles": self.numOfCycles,
            "mistakes_compressions": self.numOfMistakeCompressions,
            "mistakes_rescue_breaths": self.numOfMistakeRescueBreaths,
        }

    def reset_count(self):
        """Resets the counting back to initial state except the number of cycles"""
        # Initializing scores to 0
        self.numOfCompressions = 0
        self.numOfRescueBreaths = 0

        # Controls the scoring to forcefully decompress the user when it reaches the ideal pressure.
        self.resetCompressions = False

        # Controls the scoring to forcefully stop the user when it reaches the ideal flow rate
        self.resetRescueBreaths = False

        # Controls when the rescue breath scoring is enabled
        self.enableRescueBreath = False

    def did_game_end(self):
        """Checks if the number of cycles reached the max cycles to end the game"""
        if self.numOfCycles >= self.maxCycles:
            return True
        else:
            return False

    def check_compression(self, value, min, max):
        """Checks if the compression reaches a certain threshold. If so, add point to the score."""

        # Disable compression counting when prompted to start rescue breaths
        if self.enableRescueBreath == True:
            return

        # Check if compression receives too much pressure, if so, count as mistake
        if value >= max and self.resetMistakeCompressions == False:
            # Sets the reset mistake compression to True
            self.resetMistakeCompressions = True

            # Add count to number of compression mistakes
            self.numOfMistakeCompressions = self.numOfMistakeCompressions + 1

        # If reset is False, checks compression if within threshold.
        if self.resetCompressions == False:
            # Check compression if within threshold
            if min <= value <= max:
                # Sets the reset compression to True
                self.resetCompressions = True

                # Add count to number of compressions
                self.numOfCompressions = self.numOfCompressions + 1

        else:

            # Check compression is released
            if value <= min:

                # Sets the reset back to False
                self.resetCompressions = False
                self.resetMistakeCompressions = False

        # Checks if compressions reached the max threshold
        if (
            self.numOfCompressions >= self.maxNumOfCompressions
            and self.enableRescueBreath == False
        ):

            # Enable rescue breath scoring
            self.enableRescueBreath = True

    def check_rescue_breath(self, status):
        """Checks if the rescue breath meter reaches a certain threshold. If so, add point to the score."""

        # Checks if rescue breath is needed or enabled
        if self.enableRescueBreath:

            # Check if rescue breath mistake reaches max threshold, if so, count as mistake
            if status == "MAX" and self.resetMistakeRescueBreaths == False:
                # Sets the reset mistake rescue breath mistake to True
                self.resetMistakeRescueBreaths = True

                # Add count to number of rescue breath mistakes
                self.numOfMistakeRescueBreaths = self.numOfMistakeRescueBreaths + 1

            # If reset is False, checks status if HIT.
            if self.resetRescueBreaths == False:

                # Checks if the rescue breath results to a HIT
                if status == "HIT":
                    # Sets the reset rescue breath to True
                    self.resetRescueBreaths = True

                    # Add count to number of rescue breaths
                    self.numOfRescueBreaths = self.numOfRescueBreaths + 1

            else:

                # Check rescue breath if under threshold
                if status == "MIN":

                    # Sets the reset back to false
                    self.resetRescueBreaths = False
                    self.resetMistakeRescueBreaths = False

            if self.numOfRescueBreaths >= self.maxNumOfRescueBreaths:

                # Add count to the cycle
                self.numOfCycles = self.numOfCycles + 1

                # Reset compression and rescue breath count
                self.reset_count()