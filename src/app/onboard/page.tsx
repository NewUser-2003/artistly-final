import RequireAuth from "../../components/Auth/RequireAuth";
import OnboardForm from "../../components/Form/OnboardForm";

export default function OnboardPage() {
  return (
    <RequireAuth>
      <main
        className="
          max-w-2xl mx-auto px-6 py-12
          bg-gradient-to-br
          from-pink-50 via-purple-50 to-blue-50
          dark:from-gray-900 dark:via-indigo-900 dark:to-gray-900
          rounded-2xl
          shadow-lg
          transition-colors duration-500
        "
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary drop-shadow-sm tracking-tight">
          Onboard a New Artist
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg max-w-2xl leading-relaxed">
          Fill out the form below to add a new artist to the platform. All fields are required unless marked optional.
        </p>
        <OnboardForm />
      </main>
    </RequireAuth>
  );
}
