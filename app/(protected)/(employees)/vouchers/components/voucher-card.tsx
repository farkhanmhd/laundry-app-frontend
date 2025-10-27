"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Voucher } from "../data";
import { DisableVoucherDialog } from "./disable-voucher-dialog";

export interface VoucherCardProps {
  voucher: Voucher;
  className?: string;
}

function formatCurrency(amount: number) {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

function getStatus(v: Voucher) {
  if (!v.isActive) {
    return { key: "inactive" as const, label: "Inactive" };
  }
  return { key: "active" as const, label: "Active" };
}

function formatExpiryLabel(expiresAt: string) {
  const target = new Date(expiresAt).getTime();
  if (Number.isNaN(target)) {
    return "Expiry unknown";
  }

  const now = Date.now();
  const diffMs = target - now;
  if (diffMs <= 0) {
    return "Expired";
  }

  const minutesTotal = Math.floor(diffMs / (60 * 1000));
  const days = Math.floor(minutesTotal / (60 * 24));
  if (days >= 1) {
    return `Expire in ${days} ${days === 1 ? "day" : "days"}`;
  }

  const hours = Math.floor(minutesTotal / 60);
  if (hours >= 1) {
    return `Expire in ${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `Expire in ${minutesTotal} ${minutesTotal === 1 ? "minute" : "minutes"}`;
}

export const VoucherCard: React.FC<VoucherCardProps> = ({
  voucher,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Voucher>(voucher);
  const status = getStatus(isEditing ? draft : voucher);

  return (
    <Card
      aria-disabled={!(isEditing ? draft.isActive : voucher.isActive)}
      className={cn(
        "border border-border bg-card text-card-foreground shadow-sm transition-colors",
        (isEditing ? draft.isActive : voucher.isActive) ? "" : "opacity-90",
        className
      )}
    >
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-3">
          {isEditing ? (
            <Input
              aria-label="Voucher name"
              className="font-semibold text-xl md:text-2xl"
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              value={draft.name}
            />
          ) : (
            <CardTitle className="text-balance font-semibold text-xl md:text-2xl">
              {voucher.name}
            </CardTitle>
          )}

          {isEditing ? (
            <Badge
              asChild
              variant={status.key === "active" ? "default" : "secondary"}
            >
              <button
                aria-label="Toggle active status"
                className="cursor-pointer"
                onClick={() =>
                  setDraft((d) => ({ ...d, isActive: !d.isActive }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDraft((d) => ({ ...d, isActive: !d.isActive }));
                  }
                }}
                type="button"
              >
                {status.label}
              </button>
            </Badge>
          ) : (
            <Badge
              aria-live="polite"
              role="status"
              variant={status.key === "active" ? "default" : "secondary"}
            >
              {status.label}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-muted-foreground text-sm">
            {"Point Cost: "}
            {isEditing ? (
              <Input
                aria-label="Points cost"
                className="inline-flex h-8 w-24 px-2 py-1 text-sm"
                onChange={(e) =>
                  setDraft({ ...draft, pointsCost: Number(e.target.value) })
                }
                type="number"
                value={draft.pointsCost}
              />
            ) : (
              <span className="font-medium text-foreground">
                {voucher.pointsCost}
              </span>
            )}{" "}
            {"points"}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="truncate text-xs uppercase" title={voucher.code}>
          code: {voucher.code}
        </div>

        <div className="text-muted-foreground text-sm">
          <span className="mr-1">Discount Total:</span>
          {isEditing ? (
            <Input
              aria-label="Discount Total"
              className="inline-flex h-8 w-28 px-2 py-1 text-sm"
              onChange={(e) =>
                setDraft({ ...draft, discountAmount: Number(e.target.value) })
              }
              type="number"
              value={draft.discountAmount}
            />
          ) : (
            <span className="font-medium text-foreground">
              {formatCurrency(voucher.discountAmount)}
            </span>
          )}
        </div>

        <div className="text-muted-foreground text-sm">
          {formatExpiryLabel((isEditing ? draft : voucher).expiresAt as string)}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button className="min-w-24" type="button">
                Save
              </Button>
              <Button
                className="min-w-24 bg-transparent"
                onClick={() => {
                  setDraft(voucher);
                  setIsEditing(false);
                }}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              className="min-w-24"
              onClick={() => {
                setDraft(voucher);
                setIsEditing(true);
              }}
              type="button"
              variant="outline"
            >
              Edit
              <span className="sr-only">{` voucher ${voucher.name}`}</span>
            </Button>
          )}
        </div>

        <DisableVoucherDialog />
      </CardFooter>
    </Card>
  );
};

export default VoucherCard;
