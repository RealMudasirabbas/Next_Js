import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User.model";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};


function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    
    const { toast } = useToast();

    const handleDeleteConfirm = async () => {
        try {
          const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
          console.log(response.data)
          toast({
            title: response.data.message,
            description: "Message deleted successfully",
            variant: "destructive"

          }),
          onMessageDelete(message._id as string)
        } catch (error) {
          console.log("Error occured in deleting message", error);
          toast({
            title: "Error occured in deleting message",
            description: "Please try again",
            variant: "destructive"
          })
        }
    };
    return (
        <Card>
            <CardHeader>
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <X className="w-5 h-5" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your message.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteConfirm}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>
            <CardContent>
                <p>{message.content}</p>
            </CardContent>
        </Card>
    );
}

export default MessageCard;
