import { AutoPassVehicle, Vehicle } from '../types/vehicle.type';

type AdditionalData = {
  owner_id: string;
  created_at: Date | number;
  usage: 'private' | 'professional' | 'both';
  is_current: boolean;
};

export const formatVehicleDataForDatabase = (
  vehicle: AutoPassVehicle,
  additional_data: AdditionalData
): Vehicle => {
  const { owner_id, created_at, usage, is_current } = additional_data;
  return {
    owner_id,
    is_current,
    created_at,
    usage,
    reg_or_vin: vehicle.reg_or_vin,
    vt_id: vehicle.car_identification.vt_id,
    ktypnr: vehicle.car_identification.ktypnr,
    ktypnr_list: JSON.stringify(vehicle.car_identification.ktypnr_list),
    reg_plate: vehicle.car_identification.reg_plate,
    vin: vehicle.car_identification.vin,
    brand: vehicle.car_identification.brand,
    model: vehicle.car_identification.model,
    version: vehicle.car_identification.version,
    manufacturer_id: vehicle.registration_info.manufacturer_id,
    manufacturer_name: vehicle.registration_info.manufacturer_name,
    model_id: vehicle.registration_info.model_id,
    model_base: vehicle.registration_info.model_base,
    generation_code: vehicle.registration_info.generation_code,
    generation_code_cg: vehicle.registration_info.generation_code_cg,
    body_id: vehicle.registration_info.body_id,
    body_name: vehicle.registration_info.body_name,
    reg_body: vehicle.registration_info.reg_body,
    energy_id: vehicle.registration_info.energy_id,
    energy_name: vehicle.registration_info.energy_name,
    gearbox_id: vehicle.registration_info.gearbox_id,
    gearbox_name: vehicle.registration_info.gearbox_name,
    gearbox_type: vehicle.registration_info.gearbox_type,
    co2: vehicle.registration_info.co2,
    depollution: vehicle.registration_info.depollution,
    date_ct: vehicle.registration_info.date_ct,
    date_pme: vehicle.registration_info.date_pme,
    reg_date: vehicle.registration_info.reg_date,
    type_mine: vehicle.registration_info.type_mine,
    type_version: vehicle.registration_info.type_version,
    type_vin: vehicle.registration_info.type_vin,
    manufacturing_date: vehicle.registration_info.manufacturing_date,
    product_key: vehicle.registration_info.product_key,
    vehicle_color: vehicle.registration_info.vehicle_color,
    propulsion_type: vehicle.registration_info.propulsion_type,
    engine_code: vehicle.registration_info.engine_code,
    engine_name: vehicle.registration_info.engine_name,
    engine_index: vehicle.registration_info.engine_index,
    engine_size: vehicle.registration_info.engine_size,
    nb_cylinders: vehicle.registration_info.nb_cylinders,
    nb_valves: vehicle.registration_info.nb_valves,
    turbo: vehicle.registration_info.turbo,
    injection_type: vehicle.registration_info.injection_type,
    real_power: vehicle.registration_info.real_power,
    fiscal_power: vehicle.registration_info.fiscal_power,
    kw_power: vehicle.registration_info.kw_power,
    cons_ext_urban: vehicle.registration_info.cons_ext_urban,
    cons_mixed: vehicle.registration_info.cons_mixed,
    cons_urban: vehicle.registration_info.cons_urban,
    wheel_base: vehicle.registration_info.wheel_base,
    height: vehicle.registration_info.height,
    width: vehicle.registration_info.width,
    length: vehicle.registration_info.length,
    weight: vehicle.registration_info.weight,
    weight_rolling: vehicle.registration_info.weight_rolling,
    weight_empty: vehicle.registration_info.weight_empty,
    tire_width: vehicle.registration_info.tire_width,
    tire_height: vehicle.registration_info.tire_height,
    tire_diameter: vehicle.registration_info.tire_diameter,
    tire_speed_index: vehicle.registration_info.tire_speed_index,
    serial_number: vehicle.registration_info.serial_number,
    siren_number: vehicle.registration_info.siren_number,
    nb_seats: vehicle.registration_info.nb_seats,
    nb_doors: vehicle.registration_info.nb_doors,
    nb_gears: vehicle.registration_info.nb_gears,
    nb_volumes: vehicle.registration_info.nb_volumes,
    typevarversprf: vehicle.registration_info.typevarversprf,
    tire_list: vehicle.registration_info.tire_list
      ? JSON.stringify(vehicle.registration_info.tire_list)
      : null,
  };
};
