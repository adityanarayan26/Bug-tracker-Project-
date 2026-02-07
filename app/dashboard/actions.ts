'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    // Securely get the user from the session, don't trust the client
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return { error: 'Unauthorized' }
    }

    const userId = user.id

    // Transaction-like logic (handled by DB trigger usually, but here manual insertion)
    // RLS/Triggers handle the 'add_owner_as_member' automatically if we set it up.
    // Based on my schema:
    // create trigger on_project_created after insert on projects for each row execute procedure public.add_owner_as_member();

    const { data, error } = await supabase
        .from('projects')
        .insert({
            name,
            description,
            owner_id: userId
        })
        .select() // need to select to return data

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    // Optional: Redirect to the new project immediately
    // redirect(`/dashboard/projects/${data[0].id}`)
}
