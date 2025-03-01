import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { fetchWorkouts, addWorkout, updateWorkout, deleteWorkout } from "../redux/workoutSlice";
import { RootState, AppDispatch } from "../redux/store";


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WorkoutList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workouts = useSelector((state: RootState) => state.workout.workouts);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("08:00");
  const [editingWorkout, setEditingWorkout] = useState<{ id: number; name: string; duration: number; day: string; startTime: string } | null>(null);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  const handleAddWorkout = () => {
    if (name && duration) {
      dispatch(addWorkout({ name, duration: Number(duration), day, startTime }));
      setName("");
      setDuration("");
      setDay("Monday");
      setStartTime("08:00");
    }
  };

  const handleUpdateWorkout = () => {
    if (editingWorkout) {
      dispatch(
        updateWorkout({
          id: editingWorkout.id,
          updatedWorkout: {
            name: editingWorkout.name,
            duration: editingWorkout.duration,
            day: editingWorkout.day || "Monday",
            startTime: editingWorkout.startTime || "08:00",
          },
        })
      );
      setEditingWorkout(null);
    }
  };

  return (
    <div className="h-screen w-screen p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Workout Tracker</h2>

      {/* Add Workout Form */}
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Add New Workout</h3>
        <div className="grid grid-cols-5 gap-2">
          <input
            type="text"
            placeholder="Workout Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg"
          />
          <input
            type="number"
            placeholder="Duration (mins)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg"
          />
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg"
          >
            {daysOfWeek.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg"
          />
          <button
            onClick={handleAddWorkout}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((dayName) => (
          <div key={dayName} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-400 text-center mb-3">{dayName}</h3>
            <div className="space-y-3">
              {workouts.filter((workout) => workout.day === dayName).map((workout) => (
                <div key={workout.id} className="bg-gray-700 p-3 rounded-lg shadow flex justify-between items-center">
                  {editingWorkout?.id === workout.id ? (
                    <div className="grid  gap-2 w-full ">
                      <input
                        type="text"
                        value={editingWorkout.name}
                        onChange={(e) => setEditingWorkout({ ...editingWorkout, name: e.target.value })}
                        className="px-3 py-2 border rounded-lg bg-gray-600 w-full"
                      />
                      <input
                        type="number"
                        value={editingWorkout.duration}
                        onChange={(e) => setEditingWorkout({ ...editingWorkout, duration: Number(e.target.value) })}
                        className="px-3 py-2 border rounded-lg bg-gray-600 w-full"
                      />
                      <input
                        type="time"
                        value={editingWorkout.startTime || "08:00"}
                        onChange={(e) => setEditingWorkout({ ...editingWorkout, startTime: e.target.value })}
                        className="px-3 py-2 border rounded-lg bg-gray-600 w-full"
                      />
                      <button onClick={handleUpdateWorkout} className="bg-green-500 text-white px-3 py-2 rounded-lg">Save</button>
                    </div>
                  ) : (
                    <div className="flex w-full justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold text-sm">{workout.name}</p> 
                        <p className="text-lg font-semibold text-sm">{workout.duration} mins</p>
                        <p className="text-gray-400 text-sm">{workout.startTime}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                            <button 
                                onClick={() => setEditingWorkout(workout)} 
                                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                            >
                                {<FaEdit className="w-4 h-4" />}
                            </button>
                            <button 
                                onClick={() => dispatch(deleteWorkout(workout.id))} 
                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                            >
                                {<FaTrash className="w-4 h-4" />}
                            </button>
                        </div>

                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
