import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Permission } from "./entities";

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>){}

    async getAllPermissions() {
        return await this.permissionRepository.find()
    }

    async getGroupedPermissions() {
        const allPermissions = await this.permissionRepository.find();
        const groupedPermissions = allPermissions.reduce((prev, current) => {
            const currentKey = current.name.split('.')[0]
            const previousPermissions = prev[currentKey] ?? []
            return {
                ...prev,
                [currentKey]: [
                    ...previousPermissions,
                    current
                ]
            }
        }, {} )
        return { groupedPermissions }
    }

    async create(data: Permission) {    
        this.permissionRepository.save(data)
    }
}