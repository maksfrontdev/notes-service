import mongoose from 'mongoose';

export default class MonitoringController {
  public static servicesHealthProbe = () =>
    mongoose.connection.readyState === 1;
}
