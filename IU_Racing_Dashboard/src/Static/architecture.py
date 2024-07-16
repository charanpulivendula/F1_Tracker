import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Create figure and axes for the architecture diagram
fig, ax = plt.subplots(figsize=(14, 10))

# Define the boxes for different components
frontend_box = patches.FancyBboxPatch((10, 7), 3, 1.5, boxstyle="round,pad=0.1", edgecolor="black", facecolor="skyblue")
backend_box = patches.FancyBboxPatch((2, 7), 3, 1.5, boxstyle="round,pad=0.1", edgecolor="black", facecolor="skyblue")
ros2_box = patches.FancyBboxPatch((2, 2), 3, 1.5, boxstyle="round,pad=0.1", edgecolor="black", facecolor="lightgreen")
google_maps_box = patches.FancyBboxPatch((10, 2), 3, 1.5, boxstyle="round,pad=0.1", edgecolor="black", facecolor="lightgreen")

# Add boxes to the plot
for box in [frontend_box, backend_box, ros2_box, google_maps_box]:
    ax.add_patch(box)

# Add small boxes for ProtoBuf serialization and deserialization
protobuf_ser = patches.Rectangle((1.75, 6.65), 0.5, 0.7, fill=False, edgecolor="purple")  # Bottom edge of backend
protobuf_deser = patches.Rectangle((1.75, 3.15), 0.5, 0.7, fill=False, edgecolor="purple")  # Half outside ROS2
ax.add_patch(protobuf_ser)
ax.add_patch(protobuf_deser)

# Add small boxes for Socket.IO (green color)
socketio_backend = patches.Rectangle((5, 7.4), 0.5, 0.7, fill=False, edgecolor="green")
socketio_frontend = patches.Rectangle((9.5, 7.4), 0.5, 0.7, fill=False, edgecolor="green")
ax.add_patch(socketio_backend)
ax.add_patch(socketio_frontend)

# Draw UDP channel as a pipe with increased width
udp_pipe = patches.FancyArrowPatch((2, 3.5), (2, 6.65), connectionstyle="arc3,rad=0", 
                                   arrowstyle='-', color='gray', linewidth=4, linestyle='dashed')
ax.add_patch(udp_pipe)

# Draw Socket.IO pipe
socketio_pipe = patches.FancyArrowPatch((5.5, 7.75), (9.5, 7.75), connectionstyle="arc3,rad=.1", 
                                        arrowstyle='-', color='green', linewidth=4, linestyle='dashed')
ax.add_patch(socketio_pipe)

# Arrows to connect components
arrow_props = dict(facecolor='black', arrowstyle='->', linewidth=1.5, shrinkA=5, shrinkB=5)
bi_arrow_props = dict(facecolor='black', arrowstyle='<->', linewidth=1.5, shrinkA=5, shrinkB=5)

ax.annotate('', xy=(2, 3.5), xytext=(2, 3.5), arrowprops=arrow_props)  # ROS2 to ProtoBuf
ax.annotate('', xy=(2, 7), xytext=(2, 6.65), arrowprops=arrow_props)  # ProtoBuf to Backend
ax.annotate('', xy=(11.5, 3.5), xytext=(11.5, 7), arrowprops=bi_arrow_props)  # Frontend to Google Maps (bidirectional)

# Text labels
ax.text(11.5, 7.75, 'Frontend', ha='center', va='center', fontsize=9)
ax.text(11.5, 7.375, 'React + D3.js', ha='center', va='center', fontsize=9)
ax.text(3.5, 7.75, 'Backend\n(Node.js, Express)', ha='center', va='center', fontsize=9)
ax.text(3.5, 2.75, 'ROS2 Nodes\n(Data Collection)', ha='center', va='center', fontsize=9)
ax.text(2, 7, 'ProtoBuf', ha='center', va='center', fontsize=7)
ax.text(2, 3.5, 'ProtoBuf', ha='center', va='center', fontsize=7)
ax.text(1.65, 5.075, 'UDP', ha='right', va='center', fontsize=9, rotation=90)
ax.text(5.25, 7.25, 'Socket.IO', ha='center', va='center', fontsize=7)
ax.text(9.75, 7.25, 'Socket.IO', ha='center', va='center', fontsize=7)
ax.text(7.5, 8.2, 'Real-time Communication', ha='center', va='center', fontsize=9)
ax.text(11.5, 2.75, 'Google Maps API\n(Location Tracking)', ha='center', va='center', fontsize=9)

# Set plot limits and title
ax.set_xlim(0, 14)
ax.set_ylim(0, 10)
ax.set_axis_off()
ax.set_title('Architecture Diagram for Autonomous Racing Car Dashboard', fontsize=16)

# Show plot
plt.tight_layout()
plt.show()