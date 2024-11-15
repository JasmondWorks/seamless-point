"use client";

import React, { useState } from "react";
import BalanceDisplay from "../../_components/BalanceDisplay";
import { Input } from "@/app/_components/ui/input";
import SelectDebitCard from "../../_components/SelectDebitCard";
import PrivacyPolicyBlock from "../../_components/PrivacyPolicyBlock";
import Button, { ButtonVariant } from "@/app/_components/Button";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import Badge, { BadgeVariant } from "@/app/_components/Badge";
import { AlertCircle, Check } from "lucide-react";
import { Label } from "@/app/_components/ui/label";

export default function Withdraw() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  console.log(dialogContent);
  function handleInitiateWithdraw() {
    setIsDialogOpen(true);
    setDialogContent("withdraw/initiate");
  }
  function handleWithdraw() {
    setDialogContent("withdraw/success");
  }
  function handleUpdateCard() {
    setIsDialogOpen(true);
    setDialogContent("card/update");
  }
  function handleInitiateRemoveCard() {
    setIsDialogOpen(true);
    setDialogContent("card/initiate-remove");
  }
  function handleRemoveCard() {
    setDialogContent("card/remove");
  }
  function handleUpdatePayment() {
    setDialogContent("payment/update");
  }
  return (
    <div className="max-w-3xl">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {dialogContent !== "payment/update" &&
          dialogContent !== "withdraw/initiate" && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="space-y-3">
                <DialogTitle className="flex flex-col items-start gap-5">
                  {dialogContent !== "card/initiate-remove" && (
                    <>
                      <Badge variant={BadgeVariant.green}>
                        <div className="p-1 bg-customGreen rounded-full">
                          <Check color="white" />
                        </div>
                      </Badge>
                      <span>
                        {dialogContent === "withdraw/success" &&
                          "Withdrawal successful"}
                        {dialogContent === "card/update" &&
                          "Card information has been updated"}
                        {dialogContent === "card/remove" &&
                          "Card removal successful"}
                      </span>
                    </>
                  )}
                  {dialogContent === "card/initiate-remove" && (
                    <>
                      <Badge variant={BadgeVariant.red}>
                        <AlertCircle color="red" />
                      </Badge>
                      <span>Remove Card</span>
                    </>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {dialogContent === "card/initiate-remove" && (
                    <span>
                      Are you sure you want to remove this card? This action
                      cannot be undone
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-3 mt-5">
                {dialogContent !== "card/initiate-remove" && (
                  <Button
                    variant={ButtonVariant.fill}
                    text="Ok"
                    className="flex-1 bg-customGreen"
                    isRoundedLarge
                  />
                )}
                {dialogContent === "card/initiate-remove" && (
                  <>
                    <Button
                      variant={ButtonVariant.outline}
                      isRoundedLarge
                      text="No"
                      className="!text-neutral-400 border-neutral-200 flex-1"
                    />
                    <Button
                      onClick={handleRemoveCard}
                      variant={ButtonVariant.fill}
                      isRoundedLarge
                      className="bg-red-600 flex-1"
                      text="Yes"
                    />
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          )}
        {(dialogContent === "payment/update" ||
          dialogContent === "withdraw/initiate") && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="space-y-3">
              <DialogTitle className="flex flex-col items-start gap-5">
                {dialogContent === "payment/update" && (
                  <div className="space-y-2">
                    <h3>Update payment method</h3>
                    <p className="text-muted text-sm">
                      Update your card details
                    </p>
                  </div>
                )}
                {dialogContent === "withdraw/initiate" && (
                  <div className="space-y-2">
                    <p className="text-lg font-bold">NGN 20, 000.00</p>
                    <p className="text-muted text-sm">Withdraw funds</p>
                  </div>
                )}
              </DialogTitle>
              <DialogDescription>
                {dialogContent === "withdraw/initiate" && (
                  <h3 className="font-bold text-xl">
                    Enter your card details to withdraw
                  </h3>
                )}
                <form>
                  <div className="lg:grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <Label>CARD NUMBER</Label>
                      <Input type="text" placeholder="Example" />
                    </div>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-3 mt-5">
              {dialogContent === "payment/update" && (
                <ButtonFormSubmit text="I UNDERSTAND" />
              )}
              {dialogContent === "withdraw/initiate" && (
                <ButtonFormSubmit
                  onClick={handleWithdraw}
                  text="I UNDERSTAND"
                />
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">Withdrawal of Funds</h1>
        <BalanceDisplay />
        <div className="flex flex-col gap-3">
          <label htmlFor="withdrawAmount">
            Enter the amount that you wish to withdraw
          </label>
          <Input id="withdrawAmount" type="text" placeholder="20, 000" />
          <p className="text-sm text-muted">
            The amount will be withdrawn to the bank {"that's"} registered with
            this account
          </p>
        </div>
        <SelectDebitCard
          onUpdatePayment={handleUpdatePayment}
          onInitiateRemoveCard={handleInitiateRemoveCard}
          onUpdateCard={handleUpdateCard}
        />
        <PrivacyPolicyBlock />
        <ButtonFormSubmit
          onClick={handleInitiateWithdraw}
          text="I UNDERSTAND"
        />
      </div>
    </div>
  );
}
