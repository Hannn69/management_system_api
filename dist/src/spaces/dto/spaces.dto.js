"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveMemberDto = exports.UpdateMemberRoleDto = exports.CancelInviteDto = exports.InviteTokenDto = exports.InviteSpaceDto = exports.DeleteSpaceDto = exports.UpdateSpaceDto = exports.CreateSpaceDto = void 0;
const class_validator_1 = require("class-validator");
const managedOptions = ['Team-managed', 'Company-managed'];
const accessOptions = ['Open', 'Restricted', 'Private'];
const roleOptions = ['admin', 'member', 'viewer'];
class CreateSpaceDto {
    name;
    key;
    type;
    app;
    managed;
    access;
    lead;
    category;
    owner;
    defaultAssignee;
}
exports.CreateSpaceDto = CreateSpaceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(16),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "app", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(managedOptions),
    __metadata("design:type", Object)
], CreateSpaceDto.prototype, "managed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(accessOptions),
    __metadata("design:type", Object)
], CreateSpaceDto.prototype, "access", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "lead", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "defaultAssignee", void 0);
class UpdateSpaceDto {
    name;
    key;
    type;
    app;
    managed;
    access;
    lead;
    category;
    owner;
    defaultAssignee;
}
exports.UpdateSpaceDto = UpdateSpaceDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(16),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "app", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(managedOptions),
    __metadata("design:type", Object)
], UpdateSpaceDto.prototype, "managed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(accessOptions),
    __metadata("design:type", Object)
], UpdateSpaceDto.prototype, "access", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "lead", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateSpaceDto.prototype, "defaultAssignee", void 0);
class DeleteSpaceDto {
    id;
    slug;
    key;
}
exports.DeleteSpaceDto = DeleteSpaceDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], DeleteSpaceDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], DeleteSpaceDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], DeleteSpaceDto.prototype, "key", void 0);
class InviteSpaceDto {
    email;
    role;
}
exports.InviteSpaceDto = InviteSpaceDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String)
], InviteSpaceDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(roleOptions),
    __metadata("design:type", Object)
], InviteSpaceDto.prototype, "role", void 0);
class InviteTokenDto {
    token;
}
exports.InviteTokenDto = InviteTokenDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], InviteTokenDto.prototype, "token", void 0);
class CancelInviteDto {
    inviteId;
}
exports.CancelInviteDto = CancelInviteDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CancelInviteDto.prototype, "inviteId", void 0);
class UpdateMemberRoleDto {
    spaceId;
    memberId;
    role;
}
exports.UpdateMemberRoleDto = UpdateMemberRoleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateMemberRoleDto.prototype, "spaceId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateMemberRoleDto.prototype, "memberId", void 0);
__decorate([
    (0, class_validator_1.IsIn)(roleOptions),
    __metadata("design:type", Object)
], UpdateMemberRoleDto.prototype, "role", void 0);
class RemoveMemberDto {
    spaceId;
    memberId;
}
exports.RemoveMemberDto = RemoveMemberDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], RemoveMemberDto.prototype, "spaceId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RemoveMemberDto.prototype, "memberId", void 0);
//# sourceMappingURL=spaces.dto.js.map