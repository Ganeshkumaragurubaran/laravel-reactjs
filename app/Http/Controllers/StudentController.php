<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index(){
        $student = Student::all();
        return response()->json($student);
    }
    public function create(Request $request){
        $validator = validator::make(
            $request->all(),[
                'firstname'=>'required',
                'lastname'=>'required',
                'user_image'=>'image|mimes:jpeg,jpg,png',
                'email'=>'required|email|unique:students',
                'phone'=>'required|min:10|numeric',
                'address'=>'required',
            ]);

            if ($validator->fails()) {
                $messages = $validator->messages();
                return response()->json([
                    'errors'=> $validator->messages(),
                    "status" => 422], 422);
            }
            $student = new Student();
            $student->firstname = $request->firstname;
            $student->lastname = $request->lastname;
            $student->email = $request->email;
            $student->phone = $request->phone;
            $student->address = $request->address;
            $student->about = $request->about;

            if($request->hasfile('user_image'))
            {
                $file = $request->file('user_image');
                $extention = $file->getClientOriginalExtension();
                $filename = time().'.'.$extention;
                $file->move('uploads/students/', $filename);
                $student->user_image = $filename;
            }
            $student->save();
            return response()->json(["student" => $student, "message"=>"Student has been created successfully"], 200);
    }
    public function update(Request $request, $id){
        $validator = validator::make(
            $request->all(),[
                'firstname'=>'required',
                'lastname'=>'required',
                'email'=>'required|email',
                'phone'=>'required|min:10|numeric',
                'address'=>'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors'=> $validator->messages(),
                    "status" => 422], 422);
            }
            $student = Student::find($id);
            $student->firstname = $request->firstname;
            $student->lastname = $request->lastname;
            $student->email = $request->email;
            $student->phone = $request->phone;
            $student->address = $request->address;
            $student->about = $request->about;
            if($request->hasfile('user_image'))
            {
                $destination = 'uploads/students/'.$student->user_image;
                if(File::exists($destination))
                {
                    File::delete($destination);
                }
                $file = $request->file('user_image');
                $extention = $file->getClientOriginalExtension();
                $filename = time().'.'.$extention;
                $file->move('uploads/students/', $filename);
                $student->user_image = $filename;
            }
    
            $student->save();
            return response()->json(["student" => $student, "message"=>"Student has been Updated successfully"], 200);
    }
    public function destroy($id)
{
    $student = Student::find($id);
    $student->delete();
    return response()->json(["message" => "Student has been deleted successfully"]);
}
public function edit($id)
{
    $student = Student::findOrFail($id);
    return response()->json([
        "student" => $student,
        "status" =>200
    ],200);
}
}
