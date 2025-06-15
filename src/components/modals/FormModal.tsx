
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  city: z.string().min(2, { message: "Please enter a city name." }),
  misses: z.string().min(10, { message: "Tell us a bit more about what you miss." }),
});

export const FormModal = ({ isOpen, onClose }: FormModalProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      misses: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Got it!",
      description: "Thanks for sharing. We'll use this to find your new favorite spots.",
    });
    onClose();
    form.reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full p-8 relative">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-transparent hover:bg-gray-100 text-black"
        >
          <X size={20} />
        </Button>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-black mb-4 font-sans">
              TELL US YOUR STORY
            </h2>
            <p className="font-mono text-sm text-gray-600">
              Let's find the places that feel like home.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-sm">Where did you move from?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Portland" {...field} className="font-mono rounded-none border-2 border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="misses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-sm">What do you miss most? Be specific!</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'My quiet coffee shop on 23rd Ave with the big windows, where they played indie folk music...'"
                        className="font-mono rounded-none border-2 border-black"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 font-mono tracking-wider py-3 rounded-none transition-transform duration-200 transform hover:scale-[1.03]"
              >
                FIND MY NEW SPOTS →
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
