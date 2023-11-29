import { NextResponse } from "next/server";

export function response(message, {status}){
    return NextResponse.json(message, {status: status})
}