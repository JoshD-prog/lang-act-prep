begin;

alter table public.enrollment_email_events
drop constraint if exists enrollment_email_events_email_type_check;

alter table public.enrollment_email_events
add constraint enrollment_email_events_email_type_check
check (
  email_type = any (
    array[
      'reminder_2_weeks_before_class'::text,
      'reminder_1_week_before_class'::text,
      'reminder_1_day_before_class'::text,
      'followup_monday_after_test'::text,
      'followup_after_score_release'::text,
      'science_lecture_available'::text
    ]
  )
);

commit;
