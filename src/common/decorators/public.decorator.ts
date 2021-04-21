import { SetMetadata } from "@nestjs/common"

export const IS_PUBLIC_DECORATOR_KEY = "IS_PUBLIC"

export const Public = () => SetMetadata(IS_PUBLIC_DECORATOR_KEY, true);