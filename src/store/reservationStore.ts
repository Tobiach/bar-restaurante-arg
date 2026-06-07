type ReservationPreselect = {
  tipo?: string;
  showNombre?: string;
  pack?: string;
};

let _preselect: ReservationPreselect = {};

export const reservationStore = {
  set: (data: ReservationPreselect) => {
    _preselect = { ..._preselect, ...data };
  },
  get: () => _preselect,
  clear: () => {
    _preselect = {};
  },
};
