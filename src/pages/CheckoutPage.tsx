import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CreditCard, DollarSign } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  cardName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), { message: "Please enter a valid 16-digit card number." }),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: "Please use MM/YY format." }),
  cvc: z.string().refine((val) => /^\d{3,4}$/.test(val), { message: "Please enter a valid CVC." }),
});

// Placeholder data for cart
const cartItems = [
    { id: 1, title: 'The Whispering Shadows', price: 14.99 },
    { id: 2, title: 'Echoes of the Past', price: 9.99 },
];
const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
const tax = subtotal * 0.08; // 8% tax
const total = subtotal + tax;


const CheckoutPage: React.FC = () => {
    console.log('CheckoutPage loaded');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // This is where you would handle the form submission, e.g., call a payment API.
        console.log("Form submitted with values:", values);
        alert("Order placed successfully! (Check console for data)");
    }

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
            <Header />
            <main className="flex-1 w-full container mx-auto px-4 py-8 md:py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>
                    <p className="text-lg text-stone-600 mt-2">Complete your purchase</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Contact & Payment Details</CardTitle>
                                        <CardDescription>All items are digital. Your email will be used for your receipt.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="you@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Separator />
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Payment Information</h3>
                                            <FormField
                                                control={form.control}
                                                name="cardName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Name on Card</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John M. Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="cardNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Card Number</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                <Input className="pl-10" placeholder="0000 0000 0000 0000" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="expiryDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Expiry Date</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="MM/YY" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="cvc"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>CVC</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="123" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                         <Button type="submit" className="w-full" size="lg">
                                            <DollarSign className="mr-2 h-4 w-4" />
                                            Place Order
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </form>
                        </Form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="flex justify-between items-center text-sm">
                                            <span className="text-stone-700">{item.title}</span>
                                            <span className="font-medium">${item.price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-600">Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-600">Taxes</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <p className="text-xs text-stone-500 text-center w-full">
                                    By placing your order, you agree to our <Link to="/terms" className="underline hover:text-stone-900">Terms of Service</Link>.
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;