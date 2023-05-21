import time
import cv2
from IPython.display import display, Image

# Initialize the camera capture
camera = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Use the appropriate camera index

while True:
    # Capture frame-by-frame from the camera
    ret, frame = camera.read()

    # Check if frame is valid
    if frame is None:
        # Handle empty frame
        print("helo")
        continue

    # Add a small delay for camera initialization
    time.sleep(0.1)

    # Convert the frame to RGB format
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Display the frame
    cv2.imshow("Camera", frame_rgb)

    display(Image(data=cv2.imencode('.jpg', frame_rgb)[1].tobytes(), format='jpg'))

    # Check for key press 'q' to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera
camera.release()
cv2.destroyAllWindows()