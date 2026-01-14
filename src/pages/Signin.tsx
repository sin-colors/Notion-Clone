import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { loginFormSchema } from "@/lib/schema";
import type { LoginFormValues } from "@/lib/schema";
import { supabase } from "@/lib/supabase";
import { useCurrentUserStore } from "@/lib/jotai/current-user.state";

function Signin() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const currentUserStore = useCurrentUserStore();
  async function onSubmit(values: LoginFormValues) {
    console.log("email: ", values.email);
    console.log("password: ", values.password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error || data.user === null) {
      toast.error("ログインに失敗しました");
      form.reset();
    } else {
      toast.success(`ログインしました`, {
        autoClose: 3000,
      });
      currentUserStore.set(data.user);
    }
  }
  // ユーザーがログインしているときはHomeページにリダイレクトさせる
  if (currentUserStore.currentUser) return <Navigate replace to="/" />;

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-zinc-800 w-full"
          >
            <h1 className="text-center text-3xl font-bold">ログイン</h1>
            <div className="mt-6 flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="w-full"
                        placeholder="example@ne.jp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="w-full"
                        placeholder="８文字以上の英数字"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-8 w-full">
              <Button
                className="w-full bg-zinc-800 py-5 text-lg tracking-widest hover:bg-zinc-700/85"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "送信中" : "ログイン"}
              </Button>
            </div>
          </form>
        </Form>
        <p className="mt-4">
          アカウントをお持ちでない場合は
          <Button
            asChild
            size={"sm"}
            variant={"link"}
            className="cursor-pointer text-lg text-blue-800 hover:text-blue-700/90"
          >
            <Link to={"/signup"}>登録へ</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Signin;
