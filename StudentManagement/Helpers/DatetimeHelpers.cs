using System;

namespace StudentManagement.App.Helpers
{
    public static class DatetimeHelpers
    {
        public static int GetAge(this DateTime dateOfBirth)
        {
            var age = DateTime.Now.Year - dateOfBirth.Year;
            if (DateTime.Now.DayOfYear < dateOfBirth.DayOfYear)
                age--;

            return age;
        }
    }
}