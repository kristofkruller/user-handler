import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";
import * as errors from "../errors";
import { User } from "./base/User";
import { UserWhereUniqueInput } from "./base/UserWhereUniqueInput";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";

@swagger.ApiTags("users")
@common.Controller("users")
export class UserController extends UserControllerBase {
  constructor(
    protected readonly service: UserService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
  
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id/password")
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "own",
  })

  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })

  async resetPassword(
    @common.Param() params: UserWhereUniqueInput,
  ): Promise<User | null> {
    const result = await this.service.resetPassword({
      where: params,
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }
}