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
import { createNewBoard } from "@/actions/board"
import { redirect } from "next/navigation"

export function CreateNewBoard(){
  const [boardName, setBoardName] = useState("")

  const handleCreateNewBoard = async () => {
    // Create new board
    console.log(boardName)
    const board = await createNewBoard(boardName)
    redirect(`/app/board/${board?.[0].id}`)
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
          <div className="flex flex-col space-y-4 w-full">
          <div className="grid flex-1 gap-2">
          <Label htmlFor="name">
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
          <div className="grid flex-1 gap-2">
          <Label htmlFor="slug">
            Slug
          </Label>
          <Input
            id="slug"
            type="text"
            readOnly
            value={boardName.toLowerCase().replace(/ /g, "-")}
          />
          </div>
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