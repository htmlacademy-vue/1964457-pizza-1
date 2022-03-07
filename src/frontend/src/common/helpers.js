import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH),
    [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES),
  };
};
