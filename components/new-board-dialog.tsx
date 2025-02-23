'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

export function CreateNewBoard(){
  const [boardName, setBoardName] = useState("")

  const handleCreateNewBoard = async () => {
    // Create new board
    console.log(boardName)
  }

  return (
    <Dialog>
      <DialogTrigger>Create new board</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>
            Here you can create a new board. Simply enter the name of the board and click create.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
          <Label htmlFor="name" className="sr-only">
              Board name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Board Name"
            value={boardName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoardName(e.target.value)}
          />
          </div>
          </div>
      <DialogFooter className="sm:justify-start">
          <Button onClick={handleCreateNewBoard} type="submit" variant="default">
            Create
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}