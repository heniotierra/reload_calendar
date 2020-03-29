export interface ScheduleAppointment {
  startDate: Date,
  endDate: Date,
}

export interface AppState {
  schedule: ScheduleAppointment[], 
}

export const schedule = {
	state: [],
	reducers: {
    // handle state changes with pure functions
    addScheduleAppointment (state: any, payload: ScheduleAppointment) {
      return [...state, ...[payload]];
    },
	},
};
