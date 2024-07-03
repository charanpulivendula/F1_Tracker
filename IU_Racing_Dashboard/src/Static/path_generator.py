import math
import json
def generate_oval_track(center_x, center_y, width, height, track_width, num_points):
    inner_track = []
    outer_track = []
    racecar_path = []
    for i in range(num_points):
        angle = 2 * math.pi * i / num_points
        # Inner track
        inner_x = center_x + ((width - track_width) / 2) * math.cos(angle)
        inner_y = center_y + ((height - track_width) / 2) * math.sin(angle)
        inner_track.append([round(inner_x, 2), round(inner_y, 2)])
        # Outer track
        outer_x = center_x + ((width + track_width) / 2) * math.cos(angle)
        outer_y = center_y + ((height + track_width) / 2) * math.sin(angle)
        outer_track.append([ round(outer_x, 2), 
                             round(outer_y, 2)])
        #racecarpath
        racecar_x = (inner_x + outer_x) / 2
        racecar_y = (inner_y + outer_y) / 2
        racecar_path.append((round(racecar_x, 2), round(racecar_y, 2)))
    return inner_track, outer_track, racecar_path

# Set track parameters
center_x, center_y = 50, 50
width, height = 80, 60  
track_width = 5  
num_points = 100  

# Generate track coordinates
inner_track, outer_track, racecar_path = generate_oval_track(center_x, center_y, width, height, track_width, num_points)

# Print the track coordinates
print("Inner Track Coordinates:")

f1 = open("inner.json",'w')
f1.write(json.dumps(inner_track))
f1.close()
f2 = open('outer.json','w')
f2.write(json.dumps(outer_track))
f2.close()
f3 = open('racepath.json','w')
f3.write(json.dumps(racecar_path))


# for i, coord in enumerate(inner_track, 1):
#     print(f"Point {i}: {coord}")

# print("\nOuter Track Coordinates:")
# for i, coord in enumerate(outer_track, 1):
#     print(f"Point {i}: {coord}")